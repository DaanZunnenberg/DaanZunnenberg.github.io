---
layout: default
title: Foreign Exchange Data
permalink: /nl/projects/foreign-exchange-data/
---

<section class="hero">
  <img class="hero-img" src="{{ '/images/volatility/quant_finance.jpg' | relative_url }}?v={{ site.time | date: '%s' }}" alt="">
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Tool &middot; 2025</div>
    <h1 class="hero-name">Foreign Exchange Data</h1>
    <p class="hero-lede">Een sandbox EUR/USD-dataset en een paar kleine scripts om hem te laden, te resamplen en te plotten.</p>
  </div>
</section>

<div class="article-body">

<p class="tagline"><code>Python</code> &middot; <a href="https://github.com/DaanZunnenberg/ForeignExchangeData" target="_blank" rel="noopener noreferrer">ForeignExchangeData op GitHub</a></p>

<h2 id="what-it-is">Wat het is</h2>
<p>
  Een public domain dataset met EUR/USD prijsbars, 2-minuten intervallen, heel 2025. Naast de data staan
  er twee kleine scripts: één om de bars te laden en te resamplen, één om ze te plotten. Dit is geen
  tradingsysteem. Het bestaat zodat iedereen backtests, indicators of analyses kan proberen op FX-data die
  er realistisch uitziet, zonder eerst een broker-feed te moeten opzetten.
</p>
<p>
  Dit is een sandbox repository. Er is geen garantie op juistheid of volledigheid van de data, en ze moet
  niet gebruikt worden voor echte tradingbeslissingen. De data en code zijn vrijgegeven onder CC0, dus
  mogen voor elk doel gebruikt, gekopieerd, aangepast en gedeeld worden.
</p>

<h2 id="data">De data</h2>
<p>
  Één CSV-bestand per maand, <code>data/eurusd_2m_2025-MM.csv</code>, twaalf bestanden in totaal. Elke
  rij is een 2-minuten bar.
</p>
<ul>
  <li><code>datetime</code> &mdash; tijdstip van de bar, UTC</li>
  <li><code>open</code> &mdash; openingsprijs</li>
  <li><code>high</code> &mdash; hoogste prijs</li>
  <li><code>low</code> &mdash; laagste prijs</li>
  <li><code>close</code> &mdash; slotprijs</li>
  <li><code>volume</code> &mdash; verhandeld volume</li>
  <li><code>trade_count</code> &mdash; aantal trades in de bar</li>
</ul>

<h2 id="loading">Laden en resamplen</h2>
<p>
  <code>scripts/data_tools.py</code> heeft vier functies. <code>load_month</code> leest de CSV van één
  maand in een DataFrame, geïndexeerd op datetime en gesorteerd. <code>load_months</code> laadt meerdere
  maanden en voegt ze samen tot één gesorteerde DataFrame, waarbij dubbele timestamps op de naden eruit
  worden gehaald. <code>load_all</code> is <code>load_months</code> over elk bestand dat in
  <code>data/</code> gevonden wordt. <code>resample</code> neemt een DataFrame en een pandas offset
  alias, zoals <code>"1h"</code> of <code>"1D"</code>, en aggregeert naar die bar-grootte: eerste open,
  hoogste high, laagste low, laatste close, opgeteld volume en trade count.
</p>
<pre class="code-block" data-lang="python"><code>from scripts.data_tools import load_months, load_all, resample

df = load_months(["2025-01", "2025-02"])  # combine specific months
df = load_all()                           # combine all available months
hourly = resample(df, "1h")               # resample to any pandas offset alias</code></pre>
<p>
  <code>available_months()</code> laat zien welke maanden een CSV-bestand hebben, door de map
  <code>data/</code> uit te lezen. De andere laadfuncties gebruiken deze intern, en het plotscript vult
  er ook <code>--all</code> mee aan.
</p>

<h2 id="plotting">Plotten</h2>
<p>
  <code>scripts/visualize.py</code> is een klein command-line script. Het laadt één of meer maanden,
  resampled ze, en tekent twee charts onder elkaar: slotprijs met de high/low-range erachter geschaduwd,
  en volume als staafdiagram daaronder, groen of rood afhankelijk van of de bar omhoog of omlaag sloot.
</p>
<pre class="code-block" data-lang="bash"><code>pip install -r requirements.txt
python scripts/visualize.py 2025-01
python scripts/visualize.py --all
python scripts/visualize.py --all --resample 1h</code></pre>
<p>
  De <code>--resample</code> flag staat standaard op <code>1h</code>. Geef een willekeurige pandas
  offset alias mee, zoals <code>5min</code> of <code>1D</code>, om de bar-grootte te veranderen voordat
  er geplot wordt. Het hele jaar plotten op de native 2-minuten resolutie is traag en onoverzichtelijk,
  dus resamplen is de moeite waard voor alles langer dan een paar maanden.
</p>

<h2 id="structure">Projectstructuur</h2>
<pre class="code-block" data-lang="txt"><code>data/
    eurusd_2m_2025-01.csv   # one file per month
    ...
    eurusd_2m_2025-12.csv

scripts/
    data_tools.py           # load_month, load_months, load_all, resample
    visualize.py             # command-line plotting script

CITATION.cff                # how to cite this dataset
LICENSE                      # CC0 1.0</code></pre>
<p class="form-hint">Verwijs je naar deze data in een paper of write-up? Zie <code>CITATION.cff</code> in de repository.</p>

</div>

<p><a href="{{ '/nl/projects/' | relative_url }}">&larr; Terug naar Projecten</a></p>
