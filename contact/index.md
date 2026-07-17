---
layout: default
title: Contact
permalink: /contact/
---

<h1>Contact</h1>
<p class="tagline">Research collaborations, roles, or an idea worth starting &mdash; get in touch.</p>

<div class="links">
  <a href="mailto:dw.zunnenberg@gmail.com">dw.zunnenberg@gmail.com</a>
  <a href="https://github.com/DaanZunnenberg">GitHub</a>
  <a href="https://www.linkedin.com/in/daanzunnenberg/">LinkedIn</a>
  <a href="https://scholar.google.com/citations?user=JLg2KjEAAAAJ">Google Scholar</a>
</div>

<h2>Send a message</h2>

<form class="contact-form" action="https://formsubmit.co/dw.zunnenberg@gmail.com" method="POST">
  <input type="hidden" name="_subject" value="New message from daanzunnenberg.github.io">
  <input type="hidden" name="_template" value="table">
  <input type="hidden" name="_captcha" value="true">
  <input type="hidden" name="_next" value="https://daanzunnenberg.github.io/contact/?sent=1">
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
      <option value="Research collaboration">Research collaboration / proposal</option>
      <option value="Role or opportunity">Role or opportunity</option>
      <option value="Starting something together">Starting something together</option>
      <option value="General question">General question</option>
      <option value="Other">Other</option>
    </select>
  </div>

  <div class="field">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="6" placeholder="A bit of context goes a long way &mdash; what you're working on, what you have in mind, and any relevant links." required></textarea>
  </div>

  <div class="form-footer">
    <span class="form-hint">Sent directly to my inbox &mdash; I read and reply to everything.</span>
    <button type="submit">Send message &rarr;</button>
  </div>
</form>

<p id="sent-note" class="sent-note">Thanks &mdash; your message was sent. I'll get back to you by email.</p>
