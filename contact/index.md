---
layout: default
title: Contact
permalink: /contact/
---

<section class="hero">
  <canvas id="signal-widget-canvas" class="hero-canvas" aria-label="Animated network of connections" aria-hidden="true"></canvas>
  <div class="hero-fade" aria-hidden="true"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Let&rsquo;s Connect<span class="hero-eyebrow-extra"> &middot; Research &amp; Industry</span></div>
    <h1 class="hero-name">Contact<span class="cursor">_</span></h1>
    <p class="hero-lede">Research collaborations, roles, or an idea worth starting.</p>
  </div>
</section>

<p class="tagline">Research collaborations, roles, or an idea worth starting. Get in touch.</p>

<div class="links">
  <a href="mailto:dw.zunnenberg@gmail.com"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 4h20v16H2V4zm10 7L4 6v2l8 5 8-5V6l-8 5z"/></svg>dw.zunnenberg@gmail.com</a>
  <a href="https://github.com/DaanZunnenberg" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.15c-3.19.7-3.86-1.53-3.86-1.53-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.7.41.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/></svg>GitHub</a>
  <a href="https://www.linkedin.com/in/daanzunnenberg/" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>LinkedIn</a>
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ" target="_blank" rel="noopener noreferrer"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 8l11 5 9-4.09V17h2V8L12 3zm-7 9.18V16c0 2.21 3.13 4 7 4s7-1.79 7-4v-3.82l-7 3.18-7-3.18z"/></svg>Google Scholar</a>
</div>

<p class="form-hint">Prefer a digital business card? <a href="{{ '/card/' | relative_url }}">Save my contact card &rarr;</a></p>

<div class="nav-cards">
  <a class="nav-card" href="{{ '/contact/research/' | relative_url }}">
    <span class="nav-card-title">Research &amp; Academic</span>
    <span class="nav-card-hint">Collaboration proposals, seminar invitations, peer review, or questions about the PhD work.</span>
  </a>
  <a class="nav-card" href="{{ '/contact/recruiters/' | relative_url }}">
    <span class="nav-card-title">Recruiters &amp; Professional</span>
    <span class="nav-card-hint">Roles, consulting, or an invitation to meet up: industry and professional contact.</span>
  </a>
</div>

<h2 id="send-a-message">Send a message</h2>

<form class="contact-form" action="https://formsubmit.co/dw.zunnenberg@gmail.com" method="POST">
  <input type="hidden" name="_subject" value="New message from daanzunnenberg.com">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_captcha" value="true">
  <input type="hidden" name="_next" value="https://daanzunnenberg.com/contact/?sent=1">
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
      <option value="Research collaboration">Research &amp; academic inquiry</option>
      <option value="Role or opportunity">Recruiting / professional opportunity</option>
      <option value="Starting something together">Starting something together</option>
      <option value="General question">General question</option>
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
